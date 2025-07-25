const router = require("express").Router();
const {
  createOrganisation,
  getOrganisation,
  getAllOrganisations,
} = require("../controllers/OrganisationController");
const upload = require("../utils/multer");

router.post("/organisation", upload.single("logo"), createOrganisation);
router.get("/organisation/:id", getOrganisation);
router.get("/organisation", getAllOrganisations);
router.get("/organisation", getAllOrganisations);

module.exports = router;
