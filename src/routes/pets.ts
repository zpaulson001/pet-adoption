import express from 'express';
import { RepositoryFactory } from '../lib/repository-factory.js';

const router = express.Router();

/**
 * @openapi
 * /pets:
 *   get:
 *     tags:
 *       - Pets
 *     summary: Get all pets
 *     responses:
 *       200:
 *         description: List of all pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
router.get('/', async (req, res) => {
  try {
    const petRepository = RepositoryFactory.getPetRepository();
    const pets = await petRepository.findAll();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

/**
 * @openapi
 * /pets/{id}:
 *   get:
 *     tags:
 *       - Pets
 *     summary: Get a pet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 */
router.get('/:id', async (req, res) => {
  try {
    const petRepository = RepositoryFactory.getPetRepository();
    const pet = await petRepository.findById(req.params.id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
});

/**
 * @openapi
 * /pets:
 *   post:
 *     tags:
 *       - Pets
 *     summary: Create a new pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Pet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Invalid request body
 */
router.post('/', async (req, res) => {
  try {
    const petRepository = RepositoryFactory.getPetRepository();
    const pet = await petRepository.create(req.body);
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create pet' });
  }
});

/**
 * @openapi
 * /pets/{id}:
 *   put:
 *     tags:
 *       - Pets
 *     summary: Update a pet by ID
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
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Pet updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet not found
 */
router.put('/:id', async (req, res) => {
  try {
    const petRepository = RepositoryFactory.getPetRepository();
    const pet = await petRepository.update(req.params.id, req.body);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update pet' });
  }
});

/**
 * @openapi
 * /pets/{id}:
 *   delete:
 *     tags:
 *       - Pets
 *     summary: Delete a pet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pet deleted successfully
 *       404:
 *         description: Pet not found
 */
router.delete('/:id', async (req, res) => {
  try {
    const petRepository = RepositoryFactory.getPetRepository();
    const success = await petRepository.delete(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pet' });
  }
});

export default router;
