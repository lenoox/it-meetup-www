import { Request, Response } from 'express';
import { User } from '../model/user';
import { Event } from '../model/event';

export const createEvent = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { title, organisation, description, dateTime } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    const date = new Date(dateTime);
    if (!title || !organisation || !description || !date || !userId) {
      throw new Error(
        'Fields title, organisation, description, date and user must be provided.'
      );
    }
    const event = new Event({
      title,
      organisation,
      description,
      date,
      user: userId,
    });
    await event.save();
    res.status(200).json(event);
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
};
export const getEvent = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
};