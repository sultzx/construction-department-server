import Monitoring from "../models/Monitoring.js"


export const create = async (req, res) => {

    try {
        const { project, demander, submitter, deadline} = req.body

        const document = new Monitoring({
            project: project,
            demander: demander,
            submitter: submitter,
            deadline: deadline
        })

        await document.save()

        res.status(200).json({
            message: 'Жаңа мониторинг сәтті қосылды',
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const all = async (req, res) => {
    try {
        const monitorings = await Monitoring.find().populate('project').populate('demander').populate('submitter').exec()
        res.status(200).json(monitorings)
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

export const setStatus = async (req, res) => {
  try {
    const monitoringId = req.params.id
    const {status} = req.body

    await Monitoring.updateOne({
      _id: monitoringId
    }, {
      status: status
    })

    res.status(200).json({
      message: 'zaebis'
    })

  } catch (error) {
    res.status(500).json(error.message)
  }
}