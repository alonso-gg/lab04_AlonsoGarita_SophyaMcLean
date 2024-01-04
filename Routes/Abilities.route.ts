import { Router } from "express";
import { ModelAbility } from "../collections";

const AbilitiesRouter = Router();

AbilitiesRouter.get('/', async (req, res) => {
    const allAbilities = await ModelAbility.find({}).lean().exec()
    res.status(200).json(allAbilities);
});


AbilitiesRouter.post('/', async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    if(!name || !description){
        res.status(500).send('Can not create an ability without name nor description.');
        return;
    }

    const newAbility = await ModelAbility.create({
        id: req.body.id,
        name: name,
        description: description
    });
    res.status(201).json(newAbility);
});

export default AbilitiesRouter;