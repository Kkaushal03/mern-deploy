import React from 'react';
import { useState } from 'react';
import {Dialog,Box,Typography,styled,InputBase,TextField,Button} from "@mui/material"
import {Close,DeleteOutline} from"@mui/icons-material";
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';
// .env file is commonly used to store configuration variables
//sensitive information such as API key
const dialogStyle ={
    height: '90%',
    width:'80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',

}
const Header = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding: '10px 15px',
    background:'#f2f6fc',
    '&>p':{
        fontSize:14,
        fontWeight: 500
    }

});
const RecipientsWrapper = styled(Box)({
    display:'flex',
    flexDirection:'column',
    padding:'0 15px',
    '&> div':{
        fontSize:15,
        borderBottom: '1px solid #F5F5F5',
        marginTop: 10,

    }
})
const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
})
const SendButton = styled(Box)({
    background: '#0B57D0',
    color: '#fff',
    fontWeight: 500,
    textTransform:'none',
    borderRadius: 18,
    width: 100,
    cursor: 'pointer',
    '&:hover':{
        background: '#004080',
    },
})

const ComposeMail = ({openDialog,setOpenDialog}) => {
    const [data,setData]=useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmail);
    const saveDraftEmails = useApi(API_URLS.saveDraftEmails);

    const config = {
        Host : "smtp.elasticemail.com",
        Username :"work1234@yopmail.com" ,
        Password : "AE0E51EBC0EE9A03AB4C593FA64185029AAC",
        Port: 2525,

    }
   const  closeComposeMail= async (e) =>{
    
        e.preventDefault();
    

        const payload = {
            to: data.to,
            from: 'khushikaushal2003@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Code for Interview',
            starred: false,
            type: 'drafts',
           }
        //    saveDraftEmails.call(payload);

        //    if(!saveDraftEmails.error){
        //     setOpenDialog(false);
        //     setData({});
        //    }
        //    else {
        //    }
        try {
            await saveDraftEmails.call(payload);
    
            setOpenDialog(false);
            setData({});
        } catch (error) {
            console.error("Error saving draft:", error);
            // You might want to show an error message to the user
        }

   };

const sendMail = (e) =>{
    e.preventDefault();
    if(window.Email){
 window.Email.send({
    ...config,
        To : data.to ,
        From : "khushikaushal2003@gmail.com",
        Subject : data.subject,
        Body : data.body
    }).then(
      message => alert(message)
    );
   }
   const payload = {
    to: data.to,
    from: 'khushikaushal2003@gmail.com',
    subject: data.subject,
    body: data.body,
    date: new Date(),
    image: '',
    name: 'Code for Interview',
    starred: false,
    type: 'sent',
   }
   sentEmailService.call(payload);
   if(!sentEmailService.error){
    setOpenDialog(false);
    setData({});
   }
   else {
    
   }
    setOpenDialog(false);
   };

   const onValueChange =(e) =>{
    setData({...data,[e.target.name]:e.target.value});
   

   }

    return (
       <Dialog
       open ={openDialog}
       PaperProps={{sx:dialogStyle}}
       >
       
       <Header>
       <Typography>New Message</Typography>
       <Close fontSize="small" onClick={(e)=> closeComposeMail(e)}/>
       </Header>
       <RecipientsWrapper>
       
       <InputBase placeholder="Recipients" name="to" onChange={(e) =>onValueChange(e)}/>
       <InputBase placeholder="Subject" name="subject" onChange={(e) =>onValueChange(e)} />
       </RecipientsWrapper>
       <TextField
        multiline
        rows={20}
        sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'}}}
        onChange={(e) =>onValueChange(e)}
        name="body"
        />
       
       <Footer>
       <SendButton onClick={(e)=> sendMail(e) }>Send</SendButton>
       <DeleteOutline onClick={() => setOpenDialog(false)}/>
       </Footer>
       </Dialog>
    )
}
export default ComposeMail;

