import Project from "../models/Project.js"


export const create = async (req, res) => {

    const userId = req.userId

    try {
        const {title, text, category, begin, end, coordinates} = req.body

        const document = new Project({
            title, 
            text,
            category,
            begin, 
            end,
            coordinates,
            owner: userId
        })

        await document.save()

        res.status(200).json({
            message: 'Жаңа жоба сәтті қосылды',

        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const all = async (req, res) => {
    try {
        
        const projects = await Project.find().populate('owner').exec()

        res.status(200).json(projects)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const remove = (req, res) => {
    try {
        const id = req.params.id
        
        Project.findOneAndDelete(
            {
              _id: id,
            },
      
            (err, doc) => {
      
              if (err) {
                return res.status(500).json({
                  message: "Жобаны өшіру кезінде қате шықты",
                });
              }
      
              if (!doc) {
                return res.status(404).json({
                  message: "Өшірейін деп отырған жоба желіде жоқ",
                });
              }
      
              res.status(200).json({
                message: "Жоба сәтті өшірілді",
              });
            }
          );
    } catch (error) {
        res.status(500).json({
            message:
            error.message})
    }
}