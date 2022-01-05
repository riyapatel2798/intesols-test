import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import FormControl from "@mui/material/FormControl"
import * as Yup from "yup"
import CustomTextField from "../../common/CustomTextForm"
import { Box, Grid } from "@mui/material"
import { GET, POST } from "../../utils/ApiHandler"
import CheckIcon from "@mui/icons-material/Check"
import Alert from "@mui/material/Alert"
import Loader from "../../common/Loader"

const UserSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
})

const UserForm = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [showLoader, setShowLoader] = React.useState(false)

  const [userInfo, setUserInfo] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
  })
  React.useEffect(() => {
    if (params.id) {
      getUser()
    }
  }, [params.id])
  const getUser = async () => {
    setShowLoader(true)
    var response = await GET("users/" + params.id)
    setUserInfo(response.data)
    setShowLoader(false)
  }

  const handleSubmit = async (data) => {
    setShowLoader(true)
    if (params.id) {
      var response = await POST("users/" + params.id, data)
      alert("Record Updated")
    } else {
      var response = await POST("users", data)
      alert("Record Created")
    }
    setShowLoader(false)
    navigate("/")
  }
  return (
    <div>
      {showLoader && <Loader />}
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Box sx={{ typography: "title", mb: 5, mt: 5, textAlign: "left" }}>
            {params.id ? "Edit" : "Create"} User
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ typography: "title", mb: 5, mt: 5, textAlign: "right" }}>
            <Link to="/">Back</Link>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={userInfo}
        enableReinitialize={true}
        validationSchema={UserSchema}
        onSubmit={async (values) => {
          handleSubmit(values)
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Field
                error={errors.first_name && touched.first_name ? true : false}
                id="first_name"
                label="First Name"
                variant="outlined"
                name="first_name"
                placeholder=""
                // defaultValue={values.first_name}
                value={values.first_name}
                as={CustomTextField}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Field
                error={errors.last_name && touched.last_name ? true : false}
                id="last_name"
                label="Last Name"
                variant="outlined"
                name="last_name"
                placeholder=""
                value={values.last_name}
                as={CustomTextField}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Field
                error={errors.email && touched.email ? true : false}
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                placeholder=""
                value={values.email}
                as={CustomTextField}
              />
            </FormControl>

            <FormControl sx={{ textAlign: "center" }}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UserForm
