import CommentaryController from "./commentary.controller";

const CommentaryController = new CommentaryController();


router.post(
    "/",CommentaryController.addCommentary
)