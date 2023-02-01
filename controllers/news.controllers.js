import News from "../models/News.js";

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;

    const news = await News.findById(id);

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAll = async (req, res) => {
  try {
    const newspaper = await News.find();
    res.status(200).json(newspaper);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const { title, date, text, imageUrl } = req.body;

    const document = new News({
      title: title,
      date: date,
      text: text,
      imageUrl: imageUrl,
    });

    await document.save();

    res.status(200).json({
      message: "Жаңалық сәтті қосылды",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const { id, title, date, text, imageUrl } = req.body;

    await News.updateOne(
      {
        _id: id,
      },
      {
        title: title,
        date: date,
        text: text,
        imageUrl: imageUrl,
      }
    );

    res.status(200).json({
      message: "Жаңалық мәліметі сәтті жаңартылды",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const remove = (req, res) => {

  try {

    const newsId  = req.params.id;

    News.findOneAndDelete(

      {
        _id: newsId,
      },

      (err, doc) => {

        if (err) {
          return res.status(500).json({
            message: "Жаңалықты өшіру кезінде қате шықты",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Өшірейін деп отырған жаңалық желіде жоқ",
          });
        }

        res.status(200).json({
          message: "Жаңалық сәтті өшірілді",
        });
      }
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
