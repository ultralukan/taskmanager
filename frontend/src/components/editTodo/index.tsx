import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useEditTaskMutation } from "../../api/tasks";
import { setInfo } from "../../slices/errorInfoSlice";
import { UserType } from "../../types/user";

interface EditTodoProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: UserType;
}

export const EditTodo: React.FC<EditTodoProps> = ({open, setOpen, data}) => {
  const dispatch = useDispatch();
  const [editTask] = useEditTaskMutation()

  const [formData, setFormData] = useState({
    title: data.title || '',
    description: data.description || '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  const validateForm = () => {
    const newErrors = {
      title: '',
      description: '',
    };

    let isValid = true;

    if (!formData.title) {
      newErrors.title = "Заголовок обязателен";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Описание обязательно";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await editTask({
          data: formData,
          id: data._id
        });
        if(response.data) {
          setOpen(false);
          setFormData({
            title: '',
            description: '',
          });
          if(response.data) {
            dispatch(setInfo('Задача отредактирована'));
          }
        }
      }catch(e){}
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormData({
      title: data.title || '',
      description: data.description || '',
    })
  }, [data])

  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form"
        onSubmit={handleSubmit}>
          <DialogTitle>
            Редактировать задачу
          </DialogTitle>
          <DialogContent>
            <TextField
              id="input"
              name="title"
              label="Заголовок"
              variant="outlined"
              fullWidth
              sx={{mt: 1}}
              value={formData.title}
              error={Boolean(errors.title)}
              helperText={errors.title}
              onChange={handleChange}
            />
            <TextField
              id="input"
              name="description"
              label="Описание"
              variant="outlined"
              fullWidth
              sx={{mt: 2}}
              value={formData.description}
              error={Boolean(errors.description)}
              helperText={errors.description}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpen(false)
            }} variant="outlined" color="error">
              Отменить
            </Button>
            <Button type="submit" variant="outlined" color="primary">
              ОК
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};