import express from "express";
import protect from "../middleware/authMiddleware.js";
import { updateJobDescription, updateProfessionalSummary, uploadResume } from "../controller/AiController.js";


const AiRouter = express.Router();

AiRouter.post('/enhance-summary',protect,updateProfessionalSummary)
AiRouter.post('/enhance-job-des',protect,updateJobDescription)
AiRouter.post('/upoad-resume',protect,uploadResume)

export default AiRouter;