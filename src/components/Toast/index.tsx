import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.css';

export default function Toast(message, type) {
    toast(message, {
        className: 'toast',
        bodyClassName: 'toast-body',
        progressClassName: 'toast-progress-' + type,
    });
/* types
    - success
    - warning
    - error
*/
}
