const AssignedPPT = require("../../models/AssignedPPT") ;

const pptAssigned = async(req,res) => {
    try
    {
        const {title,description,subject,grade,fileUrl, uploadedBy,assignedTo} = req.body ;

        if(!title || !description || !subject || !grade || !fileUrl || !uploadedBy || !assignedTo)
            throw new Error("Data is not completed") ;


        const PPT = await AssignedPPT.create({title: title, description: description, subject: subject,  grade: grade, fileUrl: fileUrl, uploadedBy: uploadedBy, assignedTo: assignedTo}) ;

        res.status(200).json({PPT}) ;
    }
    catch(err)
    {
        res.send(err) ;
    }
}

const getAssignedPPT = async (req,res) => {
    try
    {
        const {email} = req.body ;

        if(!email)
            throw new Error("Send email properly") ;


        const data = await AssignedPPT.find(email) ;

        res.status(200).json({
            data : {
                title: data.title,
                description: data.description,
                subject: data.subject,
                grade: data.grade,
                fileUrl: data.fileUrl, 
                uploadedBy: data.uploadedBy,
                assignedTo: data.assignedTo,
            }
        }) ;
    }
    catch(err)
    {
        res.send(err) ;
    }
}

module.exports = {pptAssigned, getAssignedPPT} ;