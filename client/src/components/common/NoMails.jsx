import { Box, Typography, styled, Divider } from '@mui/material';



const Component = styled(Box)({
    display: 'flex',
    alignItems: 'centre',
    flexDirection: 'column',
    marginTop:50,
    opacity: '.8',
    width: '100%'

});
const NoMails = ({message}) =>{
    return(
       <Component>
       <Typography>{message.heading}</Typography>
       <Typography>{message.subHeading}</Typography>
       <Divider/>
       </Component>
    )
}

export default NoMails;