import { useOutletContext,useLocation } from "react-router-dom";
import {Box,Typography,styled} from '@mui/material';
import { ArrowBack ,Delete, GifBoxRounded} from "@mui/icons-material";
import { emptyProfilePic } from "../constants/constant";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
const IconWrapper = styled(Box)({
    padding: 15
})
const Subject = styled(Typography)({
fontSize: 22,
margin: '10px 0 20px 75px'
})
const Indicator = styled(Box)({
fontSize: 12,
background: '#ddd',
color: '#222',
padding: '2px 4px ',
borderRadius: 4,
alignSelf: 'centre',
})

const Container = styled(Box)({
    marginLeft: 15,
    
   width: '100%',
  
  ' & > div':{
    display: 'flex',
    '& > p > span':{
        fontSize: 12,
        color: '#5E5E5E',
    }
  }

})
const Image = styled('img')({
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 10px 0 10px',
    background: '#cccccc',

})
const Date= styled(Box)({
    margin: '0 50px 0 auto',
    fontSize: 12,
    color: '#5E5E5E',
})
//window.history.back this is a function brings routing browser history
//&#60; here we re using this for < and &#62; for >
const  ViewEmail = () =>{
    const {openDrawer} = useOutletContext();
    const {state}= useLocation();
    const {email} =state;
    const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);
    const deleteEmail =() =>{
        moveEmailsToBinService.call([email._id]);
        window.history.back();
    }
//here we are using destructuring concept to find email
    return(

        <Box style={openDrawer ? {marginLeft: 250  }:{width: '100%'}}>
      <IconWrapper>
      <ArrowBack onClick={() => window.history.back() } color ="action" fontSize="small"/>
      <Delete fontSize="small" color="action" style={{marginLeft: 40}} onClick={() => deleteEmail()}/>
      </IconWrapper>
      <Subject>
      {email.subject} <Indicator component="span">Inbox</Indicator>
      </Subject>
      <Box style ={{width: '100%'}}>
      <Image src={emptyProfilePic} alt="dp"/>
     
      <Container>
      <Box>
      <Typography style={{marginTop: 10}}>{email.name}
      <Box component= "span"> &nbsp; &#60;{email.to}&#62;</Box>
      </Typography>
      
      <Date>
      {(new window.Date(email.date)).getDate()} &nbsp;
      {(new window.Date(email.date)).toLocaleString('default',{month: 'long'})} &nbsp;
      {(new window.Date(email.date)).getFullYear()}
      </Date>
      </Box>
      </Container>
      <Typography style={{marginTop:20}}>{email.body}</Typography>
      </Box>
        </Box>
    )

}
export default ViewEmail;