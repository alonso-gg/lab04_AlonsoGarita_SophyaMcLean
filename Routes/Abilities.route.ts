import { Router } from "express";
import { ModelAbility, authenticationMiddleware } from "../collections";


const AbilitiesRouter = Router();

AbilitiesRouter.get('/',authenticationMiddleware, async (req, res) => {
    const allAbilities = await ModelAbility.find({}).lean().exec()
    res.status(200).json(allAbilities);
});


AbilitiesRouter.post('/',authenticationMiddleware,async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    if(!name || !description){
        res.status(500).send('Can not create an ability without name nor description.');
        return;
    }

    const newAbility = await ModelAbility.create({
        name: name,
        description: description
    });
    res.status(201).json(newAbility);
});

export default AbilitiesRouter;