import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

let toast = useToast({
  position: "top-right",
  duration: 3000,
  dismissible: true,
  pauseOnHover: true,
});

export default toast;
