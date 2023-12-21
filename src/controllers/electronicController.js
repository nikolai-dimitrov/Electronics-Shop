router = require("express").Router();
const electronicService = require("../services/electronicService");
const { extractErrorMessages } = require("../utils/errorUtil");
const { isAuth } = require("../middlewares/authMiddleware");
//Catalog page.
router.get("/catalog", async (req, res) => {
  const allElectronics = await electronicService.getAll().lean();
  res.render("electronics/catalog", { allElectronics });
});

//Details page.
router.get("/details/:electronicId", async (req, res) => {
  const electronicId = req.params.electronicId;
  const currentElectronic = await electronicService.getOne(electronicId).lean();
  const isOwner = await electronicService.isOwner(electronicId, req.user?._id);
  const hasAlreadyBought = await electronicService.hasAlreadyBought(
    electronicId,
    req.user?._id
  );
  res.render("electronics/details", {
    currentElectronic,
    isOwner,
    hasAlreadyBought,
  });
});
//Search page.
router.get("/search", isAuth(true), async (req, res) => {
  const searchedElectronics = await electronicService.getAll().lean();
  res.render("electronics/search", { searchedElectronics });
});

router.post("/search", isAuth(true), async (req, res) => {
  const queryParams = { ...req.body };
  const searchedElectronics = await electronicService
    .getQueriedElectronics(queryParams)
    .lean();
  res.render("electronics/search", { searchedElectronics });
});

//Create page.
router.get("/create", isAuth(true), (req, res) => {
  res.render("electronics/create");
});

router.post("/create", isAuth(true), async (req, res) => {
  try {
    const data = { ...req.body, owner: req.user?._id };
    await electronicService.create(data);
    res.redirect("/electronics/catalog");
  } catch (error) {
    const errorMessages = extractErrorMessages(error);
    res.render("electronics/create", { errorMessages: errorMessages });
  }
});

//Edit page.
router.get("/edit/:electronicId", isAuth(true), async (req, res) => {
  const electronicId = req.params.electronicId;
  const isOwner = await electronicService.isOwner(electronicId, req.user?._id);
  if (!isOwner) {
    res.redirect("/404");
    return;
  }
  const currentElectronic = await electronicService.getOne(electronicId).lean();
  res.render("electronics/edit", { currentElectronic });
});

router.post("/edit/:electronicId", isAuth(true), async (req, res) => {
  try {
    const electronicId = req.params.electronicId;
    const isOwner = await electronicService.isOwner(
      electronicId,
      req.user?._id
    );
    if (!isOwner) {
      res.redirect("/404");
      return;
    }
    const newData = { ...req.body };
    await electronicService.edit(electronicId, newData);
    res.redirect(`/electronics/details/${electronicId}`);
  } catch (error) {
    const errorMessages = extractErrorMessages(error);
    const currentElectronic = await electronicService
      .getOne(req.params.electronicId)
      .lean();
    res.render("electronics/edit", {
      errorMessages: errorMessages,
      currentElectronic,
    });
  }
});

//Delete page.
router.get("/delete/:electronicId", isAuth(true), async (req, res) => {
  const electronicId = req.params.electronicId;
  const isOwner = await electronicService.isOwner(electronicId, req.user?._id);
  if (!isOwner) {
    res.redirect("/404");
    return;
  }
  await electronicService.delete(electronicId);
  res.redirect("/electronics/catalog");
});

//Buy electronic.
router.get("/buy/:electronicId", isAuth(true), async (req, res) => {
  const electronicId = req.params.electronicId;
  const userId = req.user?._id;
  const isOwner = await electronicService.isOwner(electronicId, userId);
  const hasAlreadyBought = await electronicService.hasAlreadyBought(
    electronicId,
    userId
  );
  if (isOwner || hasAlreadyBought) {
    res.redirect("/404");
    return;
  }

  await electronicService.buy(electronicId, userId);
  res.redirect(`/electronics/details/${electronicId}`);
});
module.exports = router;
