import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useAddTaskMutation } from "../../api/tasks";
import { setInfo } from "../../slices/errorInfoSlice";
import { useDispatch } from "react-redux";

interface AddTodoProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({open, setOpen}) => {
  const [addTask] = useAddTaskMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
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
        const response = await addTask(formData);
        if(response.data) {
          setOpen(false);
          setFormData({
            title: '',
            description: '',
          });

          // добавляем всплывающее окно
          dispatch(setInfo('Задача добавлена'))
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

  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box       component="form"
        onSubmit={handleSubmit}>
          <DialogTitle>
            Добавить задачу
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