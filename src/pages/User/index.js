import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

import { DELETE, GET } from "../../utils/ApiHandler"
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  TablePagination,
} from "@mui/material"
import { Link } from "react-router-dom"
import ConfirmDialog from "../../common/ConfirmDialog"
import Loader from "../../common/Loader"

const User = () => {
  const [users, setUsers] = React.useState([])
  const [showDeleteModel, setShowDeleteModel] = React.useState(false);
  const [deleteUserId, setDeleteUserId] = React.useState(null);
  const [isUserDeleted, setIsUserDeleted] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalRecords, setTotalRecords] = React.useState(1)

  React.useEffect(() => {
    getUsersList()
  }, [currentPage])

  const getUsersList = async () => {
    setShowLoader(true);
    var response = await GET("users?page=" + currentPage)
    setUsers(response.data)
    setTotalRecords(response.total)
    setShowLoader(false);
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1)
  }

  const deleteUser = async () => {
    setShowDeleteModel(false);
    setShowLoader(true);
    var response = await DELETE("users/" + deleteUserId)
    setIsUserDeleted(true);
    setTimeout(() => {
      setIsUserDeleted(false);
    }, 3000)
    getUsersList()
  }

  return (
    <>
      {showLoader && <Loader /> }
      <Grid container spacing={2} columns={16}>
        <Grid item xs={16}>
          <Box sx={{ typography: "title", mb: 5, mt: 5, textAlign: "right" }}>
            <Link variant="outlined" to="/user">
              {" "}
              Create User
            </Link>
          </Box>
        </Grid>
      </Grid>
      {isUserDeleted && <Alert severity="success">Deleted Successfully!!</Alert> }

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Avtar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar alt={row.first_name} src={row.avatar} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.first_name} {row.last_name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell>
                  <DeleteIcon
                    onClick={() => {
                      setShowDeleteModel(true);
                      setDeleteUserId(row.id);
                    }}
                  />
                  <Link to={"/user/" + row.id}>
                    <EditIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={totalRecords}
          rowsPerPage={6}
          page={currentPage - 1}
          onPageChange={handleChangePage}
        />
      </TableContainer>

      <ConfirmDialog
        open={showDeleteModel}
        title={"Are you sure you want to delete?"}
        desription={
          "Are you sure you want to delete? once you delete the record you can not recover it."
        }
        handleClose={()=>setShowDeleteModel(false)}
        handleDelete={deleteUser}
      />
    </>
  )
}

export default User
