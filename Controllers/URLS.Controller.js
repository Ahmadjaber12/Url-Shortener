import Urls from "../DB/Models/Urls.js"
import User from "../DB/Models/User.js";

export const CreateUrl=async(req,res)=>{

    const {origionalURL}=req.body;

    try {
        const url=await Urls.create({origionalURL,UserId:req.userId});
        let ShortUrl=`https://www.shortUrl.com/${url.code}`
    
        return res.json({ShortUrl})

    } catch (error) {
      
      const messages = error.errors.map(e => e.message);
      return res.status(400).json({ errors: messages });
    
    
    }
    
}
export const UrlRedirection=async(req,res)=>{

    const {code}=req.params;
    const url=await Urls.findOne({code});

    if(url){
        res.json(`redirect for ${url.origionalURL}`);
    }
    else{
        res.status(404).json({message:"Not Found"});
    }
}
export const getUrl=async(req,res)=>{
    const {id}=req.params;
    const url=await Urls.findOne({where:{id}})
    if(!url){
       return res.status(404).json({message:"Not found"})
    }
       return res.status(200).json({url})

}

export const getAllURLS=async(req,res)=>{

    const size=req.query.size || 2;
    const fieldName=req.query.fieldName || "ExpiresIn";
        
    const { count, rows:urls }=await Urls.findAndCountAll({where:{UserId:req.userId},order:[[fieldName,"ASC"]],limit:+size,attributes:["origionalURL"],include:{model:User,attributes:["Username"]}})
    if(count)
    {       

        return res.json(urls)
    }
    else{
        
        return res.status(200).json({message:"No Rows"})
    }

}
export const DeleteUrl=async(req,res)=>{
    const {id}=req.params;
    const url=await Urls.findByPk(id);
    if(url){
        await Urls.destroy({where:{id}})
        return res.status(200).json({message:"Url deleted successfully"})

    }
    else{
    return res.status(200).json({message:"No Url Found"})

    }
}