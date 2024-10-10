import path from "path";
import multer from "multer";
import express from "express";
import postSchema from "../models/post.mongo";
import userSchema from "../models/user.mongo";

const postRouter = express.Router();

interface MulterFile {
  filename: string;
  path: string;
  originalname: string;
  mimetype: string;
  size: number;
}

const storage = multer.diskStorage({
  destination: "./media/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
}).single("file");

postRouter.use(express.urlencoded({ extended: true }));
postRouter.use(express.json());


postRouter.post("/post", async (req, res) => {
  try {
    const info = await userSchema
    .find({ accessToken: req.header("accessToken") })
    .exec();
    console.log("ACCESS TOKEN: " + req.header("accessToken"));
    
    const uploadFile = () => {
      return new Promise<MulterFile | undefined>((resolve, reject) => {
        upload(req, res, (err) => {
          if (err) {
            return reject(err);
          }
          resolve(req.file as MulterFile);
        });
      });
    };
    const mediaArr: string[] = [];
    
    const file = await uploadFile();
    if (file) {
      const fileDetails = {
        fileName: file.filename,
        filePath: `${req.protocol}://${req.get('host')}/media/${req.file!.filename}`,
      };
      console.log("Full file path:", path.join(__dirname, 'media', req.file!.filename));
      // const filepath = `${req.protocol}://${req.get('host')}/media/${req.file!.filename}`
      mediaArr.push(fileDetails.filePath);
    }
    console.log("INFOOOOOOO" + req.body.content);

    try {
      const post = new postSchema({
        user: info[0]._id,
        text: req.body.content,
        media: mediaArr,
      });
      await post.save();
      console.log("Post saved: " + post);
      return res.json({ post });
    } catch (err) {
      console.error("Error: " + err);
      const errorMessage = (err as Error).message;
      return res
        .status(500)
        .json({ message: "Failed to save post", error: errorMessage });
    }
  } catch (error) {
    const errMessage = (error as Error).message;
    return res.status(500).json({ message: "Server error", error: errMessage });
  }
});

postRouter.get("/getPosts", async (req, res) => {
  try {
    const getPosts = await postSchema
      .find({})
      .populate("user", "username firstName lastName");
      console.log(getPosts);
      return res.json(getPosts);
  } catch (err) {
    const errMessage = (err as Error).message;
    return res.status(500).json({message:"Can't get posts",error: errMessage});
  }
});

export default postRouter;
