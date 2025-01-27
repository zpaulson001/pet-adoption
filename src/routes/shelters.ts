import express from 'express';
import { RepositoryFactory } from '../lib/repository-factory.js';

const router = express.Router();

/**
 * @openapi
 * /shelters:
 *   get:
 *     tags:
 *       - Shelters
 *     summary: Get all shelters
 *     responses:
 *       200:
 *         description: List of all shelters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shelter'
 */
router.get('/', async (req, res) => {
  try {
    const shelterRepository = RepositoryFactory.getShelterRepository();
    const shelters = await shelterRepository.findAll();
    res.json(shelters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shelters' });
  }
});

/**
 * @openapi
 * /shelters/{id}:
 *   get:
 *     tags:
 *       - Shelters
 *     summary: Get a shelter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shelter details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shelter'
 */
router.get('/:id', async (req, res) => {
  try {
    const shelterRepository = RepositoryFactory.getShelterRepository();
    const shelter = await shelterRepository.findById(req.params.id);
    if (shelter) {
      res.json(shelter);
    } else {
      res.status(404).json({ error: 'Shelter not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shelter' });
  }
});

/**
 * @openapi
 * /shelters:
 *   post:
 *     tags:
 *       - Shelters
 *     summary: Create a new shelter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shelter'
 *     responses:
 *       201:
 *         description: Shelter created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shelter'
 */
router.post('/', async (req, res) => {
  try {
    const shelterRepository = RepositoryFactory.getShelterRepository();
    const shelter = await shelterRepository.create(req.body);
    res.status(201).json(shelter);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create shelter' });
  }
});

/**
 * @openapi
 * /shelters/{id}:
 *   put:
 *     tags:
 *       - Shelters
 *     summary: Update a shelter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shelter'
 *     responses:
 *       200:
 *         description: Shelter updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shelter'
 */
router.put('/:id', async (req, res) => {
  try {
    const shelterRepository = RepositoryFactory.getShelterRepository();
    const shelter = await shelterRepository.update(req.params.id, req.body);
    if (shelter) {
      res.json(shelter);
    } else {
      res.status(404).json({ error: 'Shelter not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update shelter' });
  }
});

/**
 * @openapi
 * /shelters/{id}:
 *   delete:
 *     tags:
 *       - Shelters
 *     summary: Delete a shelter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Shelter deleted successfully
 *       404:
 *         description: Shelter not found
 */
router.delete('/:id', async (req, res) => {
  try {
    const shelterRepository = RepositoryFactory.getShelterRepository();
    const success = await shelterRepository.delete(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Shelter not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete shelter' });
  }
});

export default router;
