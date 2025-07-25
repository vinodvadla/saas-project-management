const { Organisation } = require("../models");

/**
 * @swagger
 * components:
 *   schemas:
 *     Organisation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         logo:
 *           type: string
 *         website:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         type:
 *           type: string
 */

/**
 * @swagger
 * /organisation:
 *   post:
 *     summary: Create a new organisation
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Organisation'
 *     responses:
 *       201:
 *         description: Organisation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisation'
 *       500:
 *         description: Internal Server Error
 */

const createOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.create({
      name: req.body.name,
      description: req.body.description,
      logo: req.body.logo,
      website: req.body.website,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      type: req.body.type,
    });
    res.status(201).json(organisation);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /organisation/{id}:
 *   get:
 *     summary: Get an organisation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the organisation to get
 *     responses:
 *       200:
 *         description: Organisation found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisation'
 *       404:
 *         description: Organisation not found
 *       500:
 *         description: Internal Server Error
 */

const getOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found" });
    }
    res.status(200).json(organisation);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /organisation:
 *   get:
 *     summary: Get all organisations
 *     responses:
 *       200:
 *         description: A list of organisations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organisation'
 *       500:
 *         description: Internal Server Error
 */

const getAllOrganisations = async (req, res) => {
  try {
    const organisations = await Organisation.findAll();
    res.status(200).json(organisations);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createOrganisation,
  getOrganisation,
  getAllOrganisations,
};
