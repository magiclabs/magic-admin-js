export class UsersController {
  public static GetUsers = (req: any, res: any) => {
    res.send({
      success: true,
      users: [
        {
          publicAddress: '0x0',
          email: 'david.he@fortmatic.com',
        },
        {
          publicAddress: '0x1',
          email: 'ian@fortmatic.com',
        },
        {
          publicAddress: '0x2',
          email: 'sean@fortmatic.com',
        },
        {
          publicAddress: '0x3',
          email: 'arthur@fortmatic.com',
        },
      ],
    });
  };
}
