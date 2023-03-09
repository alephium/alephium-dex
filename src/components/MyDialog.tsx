import { Dialog, DialogProps } from "@material-ui/core";

export function MyDialog(props: DialogProps) {
  return (
    <Dialog {...props}
      BackdropProps={{ style: { backgroundColor: 'rgb(10,10,10,0.7)' } }}
      PaperProps={{ style: {
        backgroundColor: "rgb(43, 43, 43)",
        borderRadius: 20,
      }}}
    >
      {props.children}
    </Dialog>
  )
}
