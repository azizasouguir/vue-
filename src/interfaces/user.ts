import { ref } from "vue";

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  age: number;
  image: File;
}
export const user = ref<User>({
  uid: "",
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  age: null,
  image: null,
});
export const clearForm = () => {
  user.value = {
    uid:"",
    firstName: "",
    lastName: "",
    age: null,
    email: "",
    password: "",
    image: null,
  };
};
