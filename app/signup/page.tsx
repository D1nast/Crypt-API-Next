'use client';

import { useState } from "react";
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function SignUp(){
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [passwordType,setPasswordType] = useState("password");

    const register = async () => {
        const url = `${process.env.REACT_APP_API}/create`;
        const reqBody = { user: { email, password: pass, password_confirmation: pass } };
        try{
            await axios.post(url,reqBody);
            //右の形でパラメータが送られる　user:{email,password, password_confirmation}
            alert("Thank you for subscribing!")
        }catch{
            alert("以下3つのいずれか当てはまるため、登録できません\n\n・既に登録済\n・無効なアドレス\n・パスワードが6文字以下")
        }
    };
    //メール配信の登録と解除
    const changeDeliver = async () => {
        const url = `${process.env.REACT_APP_API}/change`;
        const reqBody = { user: { email, password: pass, password_confirmation: pass } };
        try{
            const query = await axios.post(url,reqBody);
            alert(query.data)}
        catch{ alert("Either the user is not registered, or the email address or password is incorrect.")}
    };
    //ユーザー削除
    const Delete = async () => {
        const url = `${process.env.REACT_APP_API}/delete`;
        const reqBody = { user: { email, password: pass, password_confirmation: pass } };
        try{
            await axios.post(url,reqBody);
            alert("executed!")
        }catch{
            alert("Either the user is not registered, or the email address or password is incorrect.")
        }
    };

    return(
        <Box sx={{border:{xs:'none',sm:0},padding:{xs:'150px 50px 150px 50px',sm:'150px 0px 60px 0px'},display:'flex',flexDirection:'column',justifyContent:'center',backgroundColor:'#000000'}}>
            {/* サブスク登録画面 */}
            <Box sx={{display:'flex',justifyContent:'center',paddingTop:'20px',paddingBottom:'20px'}}>
                <Box sx={{width:"500px",display:"flex",flexDirection:"column",alignItems:"center",maxWidth:'100%',
                    padding:{xs:'20px 0px 20px 0px',sm:'20px 0px 20px 0px'},border:"solid #FFFFFF",boxShadow:"0 3px 5px rgba(0, 0, 0, 0.22)"}}>
                    <Typography sx={{marginBottom:"20px",color:'#FFFFFF'}}>Subscription</Typography>
                {/* メールアドレス */}
                <Box>
                    {/* <input value={email} placeholder="Mail" onChange={(e) => setEmail(e.target.value)} sx={{ width: "400px" }}/> */}
                    <Input value={email} placeholder=" Mail" onChange={(e) => setEmail(e.target.value)} 
                    sx ={{backgroundColor:'white',width:{xs:'250px',sm:'400px'},height:{xs:'20px',sm:'20px'}}} />
                </Box>

                {/* パスワード入力 */}
                <Box sx={{marginTop:'50px',display:'flex',alignItems:'center',maxWidth:'400px'}}>
                    {/* <input value={pass} placeholder="Pass(６文字以上)" type={passwordType} onChange={(e) => setPass(e.target.value)} style={{ width: "400px"}}/> */}
                    <Input value={pass} placeholder=" Pass(６文字以上)"type={passwordType} onChange={(e) => setPass(e.target.value)} 
                    sx ={{backgroundColor:'white',width:{xs:'225px',sm:'400px'},height:{xs:'20px',sm:'20px'}}} />
                    {passwordType === "password" && (<VisibilityOffIcon sx={{marginLeft:"8px",backgroundColor:'white',maxHeight:'20px'}} onClick={() => setPasswordType("text")} className="Password__visual"/>)}
                    {passwordType === "text" && (<VisibilityIcon sx={{marginLeft:"8px",backgroundColor:'white',maxHeight:'20px'}} onClick={() => setPasswordType("password")} className="Password__visual"/>)}
                </Box>
                 
                {/* ボタン */}
                <Box style={{ marginTop: "20px" }}>
                    <button onClick={register}>Subscribe</button>
                    <button onClick={changeDeliver}>Stop / Resume</button>
                    <button onClick={Delete}>Delete</button>
                </Box>
                </Box>
            </Box>
            {/* 各ボタン説明 */}
            <Box sx={{marginTop:'50px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                <Typography sx={{marginBottom:"20px",color:'#FFFFFF'}}>Subscribe : Register your email address</Typography>
                <Typography sx={{marginBottom:"20px",color:'#FFFFFF'}}>Stop / resume : Stop delivering email. If you've already stopped,resume delivering.</Typography>
                <Typography sx={{marginBottom:"20px",color:'#FFFFFF'}}>Delete : Delete your email address</Typography>
            </Box>
        </Box> 
                
    );
}

