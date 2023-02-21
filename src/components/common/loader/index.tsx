import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import { TransitionProps } from '@mui/material/transitions';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface props {
  load: boolean
}
export default function TransitionsSnackbar({ load }: props) {
  return (
    <div>
      <Snackbar open={load} autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }} >
        <Alert severity="success" sx={{ width: '100%' }}>
          Loading . . . .
        </Alert>
      </Snackbar>
    </div>
  );
}