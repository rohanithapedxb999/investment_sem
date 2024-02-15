import {
  CANCLE_BUTTON_COLOR,
  CANCLE_BUTTON_TEXT,
  CONFIRM_BUTTON_COLOR,
  CONFIRM_BUTTON_TEXT,
} from '../contants'

export const AlertProps = {
  showCancelButton: true,
  cancelButtonText: CANCLE_BUTTON_TEXT,
  confirmButtonText: CONFIRM_BUTTON_TEXT,
  reverseButtons: false,
  cancelButtonColor: CANCLE_BUTTON_COLOR,
  confirmButtonColor: CONFIRM_BUTTON_COLOR,
  heightAuto: false,
  allowOutsideClick: false,
  allowEscapeKey: false,
}
