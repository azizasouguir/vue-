// src/utils/alert.ts
import Swal, { type SweetAlertIcon } from 'sweetalert2';

type AlertOptions = {
  title: string;
  icon?: SweetAlertIcon;
  text?: string;
  draggable?: boolean;
  timer?: number;
  confirmButtonText?: string;
};

export const showAlert = (options: AlertOptions) => {
  return Swal.fire({
    title: options.title,
    icon: options.icon,
    text: options.text,
    draggable: options.draggable,
    timer: options.timer,
    confirmButtonText: options.confirmButtonText
  });
};