export class CommentsController {
  public static GetCommentsForUser = (req: any, res: any) => {
    res.send({
      success: true,
      comments: [
        {
          id: 1,
          uid: 123,
          text: 'Test comment 1',
        },
        {
          id: 2,
          uid: 123,
          text: 'Test comment 2',
        },
      ],
    });
  };
}
