import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interface/Request.interface';

export function checkRole(...allowedRoles: string[]) {
return (req: RequestWithUser, res: Response, next: NextFunction) => {

    const user = req.user;
		const {published} = req.body
		console.log(published);
		console.log(user);

		if (user && allowedRoles.includes(user.role)) {

      next();

    } else {

      res.status(403).send({ error: 'Permission denied' });

    }

  };

}

