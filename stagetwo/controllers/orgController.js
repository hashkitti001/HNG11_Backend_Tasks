const getOrganisations = async (req, res) => {
    try {
        // Assuming user information is available in req.user after authentication
        const userId = req.user.userId;

        // Query organisations where the user is the creator or a member
        const organisations = await Organisation.findAll({
            where: {
                [Op.or]: [
                    { createdBy: userId }, // Assuming createdBy is the userId of the creator
                    { '$members.userId$': userId } // Assuming 'members' is a related table with userId
                ]
            },
            include: [{ model: User, as: 'members', attributes: ['userId', 'firstName', 'lastName', 'email', 'phone'] }]
        });

        res.status(200).json({
            status: 'success',
            message: 'Organisations retrieved successfully',
            data: {
                organisations: organisations.map(org => ({
                    orgId: org.orgId,
                    name: org.name,
                    description: org.description
                }))
            }
        });
    } catch (error) {
        console.error('Error fetching organisations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOrganisationById = async (req, res) => {
    try {
        const { orgId } = req.params;

        // Query organisation by orgId
        const organisation = await Organisation.findOne({
            where: { orgId },
            include: [{ model: User, as: 'members', attributes: ['userId', 'firstName', 'lastName', 'email', 'phone'] }]
        });

        if (!organisation) {
            return res.status(404).json({ message: 'Organisation not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Organisation retrieved successfully',
            data: {
                orgId: organisation.orgId,
                name: organisation.name,
                description: organisation.description
            }
        });
    } catch (error) {
        console.error('Error fetching organisation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createOrganisation = async (req, res) => {
    const { name, description } = req.body;

    try {
        // Validate request body
        if (!name) {
            return res.status(400).json({ status: 'Bad Request', message: 'Organisation name is required' });
        }

        const createdBy = req.user.userId;

        const newOrganisation = await Organisation.create({ name, description, createdBy });

        res.status(201).json({
            status: 'success',
            message: 'Organisation created successfully',
            data: {
                orgId: newOrganisation.orgId,
                name: newOrganisation.name,
                description: newOrganisation.description
            }
        });
    } catch (error) {
        console.error('Error creating organisation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addUserToOrganisation = async (req, res) => {
    const { userId } = req.body;
    const { orgId } = req.params;

    try {
       
        const organisation = await Organisation.findOne({ where: { orgId } });

        if (!organisation) {
            return res.status(404).json({ message: 'Organisation not found' });
        }

       
        await organisation.addMember(userId);

        res.status(200).json({
            status: 'success',
            message: 'User added to organisation successfully'
        });
    } catch (error) {
        console.error('Error adding user to organisation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getOrganisations,
    createOrganisation,
    getOrganisationById,
    addUserToOrganisation
}