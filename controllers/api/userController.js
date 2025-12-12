export class UserApiController {
  constructor(userService) {
    this.userService = userService;
  }

  getAll = async (req, res, next) => {
    const users = await this.userService.getAllUsers();
    res.json(users);
  };

  getAllDetailed = async (req, res, next) => {
    const users = await this.userService.getAllUsersDetailed();
    res.json(users);
  };

  getById = async (req, res, next) => {
    const id = Number(req.params.id);
    const user = await this.userService.getUserById(id);
    res.json(user);
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await this.userService.login(email, password);
    res.json(user);
  };

  create = async (req, res, next) => {
    const { name, email, password, planid } = req.body;
    const userData = { name, email, password };
    if (planid !== undefined) userData.planid = Number(planid);
    const newUser = await this.userService.createUser(userData);
    res.status(201).json(newUser);
  };

  update = async (req, res, next) => {
    const id = Number(req.params.id);
    const { name, email, planid } = req.body;
    const updatedUser = await this.userService.updateUser(id, {
      name,
      email,
      planid: Number(planid),
    });
    res.json(updatedUser);
  };

  delete = async (req, res, next) => {
    const id = Number(req.params.id);
    await this.userService.deleteUser(id);
    res.status(204).send();
  };

  checkDailyConversions = async (req, res, next) => {
    const userId = Number(req.params.id);
    const result = await this.userService.getUserConversionInfo(userId);
    res.json(result);
  };
}
