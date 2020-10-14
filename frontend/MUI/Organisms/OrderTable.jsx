import React from "react";
import { ListItemLink } from "../Molecules/ListItemLink";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

export const OrderTable = ({ data }) => {
  const classes = useStyles();
  const parseISOString = (s) => {
    var b = s.split(/\D+/);
    console.log(s, b);
    return `${b[0]}-${b[1]}-${b[2]},  ${b[3]}:${b[4]}:${b[5]}`;
  };
  console.log("ORDER", data);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Order's Date</StyledTableCell>
            <StyledTableCell align="center">Products</StyledTableCell>

            <StyledTableCell align="center">Total</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length
            ? data.map((item, index) => {
                if (item.payed) {
                  return (
                    <StyledTableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {parseISOString(item.updatedAt)}
                      </TableCell>
                      <TableCell align="left">
                        {item.last_dishes.map((dish, i) => {
                          return (
                            <List
                              component="nav"
                              aria-label="secondary mailbox folders"
                              key={item.id + dish.id}
                            >
                              <ListItemLink
                                price={dish.price}
                                quantity={dish.quantity}
                                name={dish.name}
                                hrefValue={"#"}
                                index={i}
                              />
                            </List>
                          );
                        })}
                      </TableCell>
                      <TableCell align="center">{item.amount}</TableCell>
                      <TableCell align="center">
                        {item.payed ? "payed" : "not-payed"}
                      </TableCell>
                    </StyledTableRow>
                  );
                } else if (index > 0) {
                  return null;
                }

                return null;
              })
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
