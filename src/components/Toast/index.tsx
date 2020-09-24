import { toast } from "react-toastify";

export default function Toast(message, type) {
  toast(message, {
    className: "toast",
    bodyClassName: "toast-body",
    progressClassName: "toast-progress-" + type,
  });
  /* types
    - success
    - warning
    - error
*/
}
