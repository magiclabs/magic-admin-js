export class LikesController {
  public static GetLikesForUser = (req: any, res: any) => {
    res.send({
      success: true,
      likes: [
        {
          id: 1,
          uid: 123,
        },
        {
          id: 2,
          uid: 124,
        },
        {
          id: 3,
          uid: 125,
        },
        {
          id: 4,
          uid: 126,
        },
      ],
    });
  };
}
