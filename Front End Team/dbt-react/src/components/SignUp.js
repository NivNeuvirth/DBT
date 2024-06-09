import { Avatar, Grid, Paper, TextField, Typography, Button, Checkbox } from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const SignUp = () => {

    const paperStyle = {padding: '30px 20px', width: 300, margin: '30px auto'}
    const avatarStyle = {backgroundColor: '#006400', margin:"10px 0 20px 0"}

    return ( 
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AppRegistrationIcon />
                    </Avatar>
                    <Typography variant="caption" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Please fill out the form to create an account</Typography>
                </Grid>

                <form action="submit">
                    <TextField fullWidth label='Name' placeholder="Enter your Name" style={{margin: "10px 0 0 0"}}/>
                    <TextField fullWidth label='Email' placeholder="Enter Email" style={{margin: "10px 0"}}/>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Phone Number' placeholder="Enter Phone Number" style={{margin: "10px 0 0 0"}}/>
                    <TextField fullWidth label='Password' placeholder="Create Password" style={{margin: "10px 0"}}/>
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm Password"/>
                    <FormControlLabel control={<Checkbox defaultChecked style={{color: '#006400'}}/>} label="I accept the terms and conditions" />
                    <Button type='submit' fullWidth variant='contained' style={{backgroundColor: '#006400', margin: "8px 0"}}>Sign Up</Button>
                </form>    
            </Paper>
        </Grid>
     );
}
 
export default SignUp;