import Contest from "../models/Contest.js"

export const create = async (req, res) => {

    try {
        const { title, text, deadline} = req.body

        const document = new Contest({
            title, text, deadline
        })

        await document.save()

        res.status(200).json({
            message: 'Жаңа конкурс сәтті қосылды',
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const all = async (req, res) => {
    try {
        const contests = await Contest.find().populate('winner').exec()
        res.status(200).json(contests)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const set = async (req, res) => {
    try {

        const { id, winner } = req.body

        await Contest.updateOne({
            _id: id
        }, {
            winner
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}