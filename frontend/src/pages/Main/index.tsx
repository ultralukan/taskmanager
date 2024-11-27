import { Box, Button, IconButton } from "@mui/material";
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { AddTodo } from "../../components/addTodo";
import { useDeleteTaskMutation, useEditTaskMutation, useGetTaskQuery } from "../../api/tasks";
import {MRT_Localization_RU} from "material-react-table/locales/ru";
import { EditTodo } from "../../components/editTodo";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import { setInfo } from "../../slices/errorInfoSlice";
import { useDispatch } from "react-redux";
import { UserType } from "../../types/user";

export const MainPage = () => {
  const dispatch = useDispatch();
  const {data: tasks = []} = useGetTaskQuery({});
  const [editTask] = useEditTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [taskForEdit, setTaskForEdit] = useState({});

  // форматируем задачи
  const formatedData = useMemo(() => {
    if(!tasks.length) return []
    return tasks.map((el: UserType) => {
      const date = new Date(el.createdAt);
      const formattedDate = date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      let updatedDate:string | Date = '';
      let formattedUpDate = '';
      if(el.updatedAt) {
        updatedDate = new Date(el.updatedAt)
        formattedUpDate = updatedDate.toLocaleString('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
      }
      return ({
        ...el,
        createdAt: formattedDate,
        updatedAt: formattedUpDate,
        completedTitle: el.completed ? 'Выполнено' : 'Не выполнено'
      })

    })
  }, [tasks])

  // задаем колонки
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Заголовок',
        size: 100,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'description',
        header: 'Описание',
        enableColumnFilter: false,
      },
      {
        accessorKey: 'createdAt',
        header: 'Дата создания',
        enableColumnFilter: false,
      },
      {
        accessorKey: 'updatedAt',
        header: 'Дата обновления',
        enableColumnFilter: false,
      },
      {
        accessorKey: 'completedTitle',
        header: 'Статус',
        filterVariant: 'select',
        filterSelectOptions: ['Выполнено', 'Не выполнено'],
      },
    ],
    [],
  );

  const handleDelete = async(id: string) => {
    try{
      const response = await deleteTask(id);
      if(response.data) {
        // добавляем всплывающее окно
        dispatch(setInfo('Задача удалена'));
      }
    }catch(e) {

    }
  }

  const handleEdit = (data: UserType) => {
    setTaskForEdit(data);
    setEditModal(true);
  }

  const handleCheck = async(data: UserType) => {
    try{
      const response = await editTask({
        data: {...data, completed: !data.completed},
        id: data._id
      });
      if(response.data) {
        // добавляем всплывающее окно
        dispatch(setInfo('Статус задачи сменился'));
      }
    }catch(e) {

    }
  }

  // определяем таблицу
  const table = useMaterialReactTable({
    columns,
    data: formatedData,
    localization: MRT_Localization_RU,
    positionToolbarAlertBanner: 'none',
    enableRowActions: true,
    enableGlobalFilter: false,
    enableColumnFilters: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
        <Button
          color="primary"
          onClick={() => {
            setAddModal(true);
          }}
          variant="contained"
        >
          Добавить
        </Button>
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton onClick={() => handleEdit(row.original)}>
          <EditIcon color="primary"/>
        </IconButton>
        <IconButton onClick={() => handleDelete(row.original._id)}>
          <DeleteIcon color="error"/>
        </IconButton>
        <IconButton onClick={() => handleCheck(row.original)}>
          {
            !row.original.completed ? <CheckIcon color="primary"/> : <RemoveIcon color="primary"/>
          }
        </IconButton>
      </Box>
    ),
    initialState: { 
      showColumnFilters: false,
     },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <AddTodo open={addModal} setOpen={setAddModal} />
      <EditTodo open={editModal} setOpen={setEditModal} data={taskForEdit as UserType}/>
    </>
  );
}