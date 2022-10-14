import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) => ({
  cell: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    wordBreak: "normal",
    position: "relative",
    "&.resize_activated::after": {
      content: "''",
      position: "absolute",
      right: spacing(1),
      width: 2,
      background: "#CCCC",
      borderRadius: 3,
      top: spacing(1),
      bottom: spacing(1)
    }
  },
  table: {
    width: "inherit",
    border: "none"
  },
  overflowWrapper: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "flex",
    width: 40,
    whiteSpace: "nowrap",
    wordBreak: "break-all"
  }
}));

export { useStyles };
