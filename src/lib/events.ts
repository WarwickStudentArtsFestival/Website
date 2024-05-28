import prisma from '@/lib/prisma';
import { Prisma, schedule_event, schedule_organisation } from '@prisma/client';
import dayjs from 'dayjs';
import { StaticImageData } from 'next/image';
import MaskImage from '@/assets/icons/mask.png';

export async function getEventInstances(
  venueId?: number,
): Promise<schedule_eventinstance_with_relations[]> {
  return prisma.schedule_eventinstance.findMany({
    orderBy: {
      start: 'asc',
    },
    where: {
      venue_id: venueId || undefined,
      parent_id: null,
      published: true,
      schedule_event: {
        published: true,
      },
    },
    include: {
      schedule_event: {
        include: {
          schedule_organisation: true,
          schedule_category: true,
          schedule_event_categories: { include: { schedule_category: true } },
        },
      },
      schedule_venue: true,
    },
  });
}

export async function getEvent(
  slug: string,
): Promise<schedule_event_with_relations_and_instances_and_children | null> {
  return prisma.schedule_event.findFirst({
    where: { slug, published: true },
    include: {
      schedule_organisation: true,
      schedule_category: true,
      schedule_event_categories: { include: { schedule_category: true } },
      schedule_eventinstance: {
        where: { published: true },
        include: {
          schedule_venue: true,
          other_schedule_eventinstance: {
            where: { published: true },
            orderBy: { start: 'asc' },
            include: {
              schedule_venue: true,
              schedule_event: {
                include: {
                  schedule_organisation: true,
                  schedule_category: true,
                  schedule_event_categories: {
                    include: { schedule_category: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function getEvents(
  limit: number = -1,
  randomise: boolean = false,
): Promise<schedule_event_with_relations_and_instances[]> {
  let events = await prisma.schedule_event.findMany({
    where: {
      published: true,
    },
    take: limit === -1 ? undefined : limit,
    include: {
      schedule_organisation: true,
      schedule_category: true,
      schedule_event_categories: { include: { schedule_category: true } },
      schedule_eventinstance: {
        where: { published: true },
        include: { schedule_venue: true },
      },
    },
  });
  if (randomise) {
    events = events
      .map((val) => ({ val, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((val) => val.val);
  }

  return events;
}

export async function getEventTinyDescriptions(): Promise<
  schedule_event_with_category[]
> {
  const events = await prisma.schedule_event.findMany({
    where: {
      published: true,
      tiny_description: { not: null },
    },
    include: {
      schedule_category: true,
    },
  });

  const randomEvents = events
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((val) => val.val);

  let usedDescriptions: schedule_event_with_category[] = [];
  for (const randomEvent of randomEvents) {
    if (
      !usedDescriptions.find(
        (description) =>
          description.tiny_description === randomEvent.tiny_description,
      )
    ) {
      usedDescriptions.push(randomEvent);
      if (usedDescriptions.length > 4) break;
    }
  }

  return usedDescriptions;
}

export function getEventCount(): Promise<number> {
  return prisma.schedule_event.count({ where: { published: true } });
}

export type schedule_event_with_relations = Prisma.schedule_eventGetPayload<{
  include: {
    schedule_organisation: true;
    schedule_category: true;
    schedule_event_categories: { include: { schedule_category: true } };
  };
}>;

export type schedule_event_with_relations_and_instances =
  schedule_event_with_relations &
    Prisma.schedule_eventGetPayload<{
      include: {
        schedule_eventinstance: { include: { schedule_venue: true } };
      };
    }>;

export type schedule_event_with_relations_and_instances_and_children =
  schedule_event_with_relations &
    Prisma.schedule_eventGetPayload<{
      include: {
        schedule_eventinstance: {
          include: {
            schedule_venue: true;
            other_schedule_eventinstance: {
              include: {
                schedule_venue: true;
                schedule_event: {
                  include: {
                    schedule_organisation: true;
                    schedule_category: true;
                    schedule_event_categories: {
                      include: { schedule_category: true };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }>;

export type schedule_eventinstance_with_relations =
  Prisma.schedule_eventinstanceGetPayload<{
    include: {
      schedule_event: {
        include: {
          schedule_organisation: true;
          schedule_category: true;
          schedule_event_categories: { include: { schedule_category: true } };
        };
      };
      schedule_venue: true;
    };
  }>;

export type schedule_event_with_category = Prisma.schedule_eventGetPayload<{
  include: {
    schedule_category: true;
  };
}>;

export function formatShowDateTime(date: Date) {
  return dayjs(date).format('ddd h:mma');
}

export function formatShowTime(date: Date) {
  return dayjs(date).format('h:mma');
}

export function getEventColourClasses(
  event: schedule_event_with_category,
): string {
  if (!event.schedule_category) return 'bg-secondary text-white';

  // https://github.com/WarwickStudentArtsFestival/WSAF-Management/blob/main/schedule/models.py#L108
  switch (event.schedule_category.colour_theme) {
    case 'YELLOW':
      return '!bg-accent !text-black';
    case 'ORANGE':
      return '!bg-event-orange !text-black';
    case 'PINK':
      return '!bg-event-pink !text-white';
    case 'PURPLE':
      return '!bg-secondary !text-white';
    default:
      return '!bg-secondary !text-white';
  }
}

export function getEventBorderClasses(
  event: schedule_event_with_category,
): string {
  if (!event.schedule_category) return 'border-b-secondary';

  // https://github.com/WarwickStudentArtsFestival/WSAF-Management/blob/main/schedule/models.py#L108
  switch (event.schedule_category.colour_theme) {
    case 'YELLOW':
      return 'border-b-accent';
    case 'ORANGE':
      return 'border-b-event-orange';
    case 'PINK':
      return 'border-b-event-pink';
    case 'PURPLE':
      return 'border-b-secondary';
    default:
      return 'border-b-secondary';
  }
}

export function getEventLogo(
  event: schedule_event_with_relations,
): string | StaticImageData {
  if (event.logo) return `${process.env.WSAF_ASSETS_BASE_URL}/${event.logo}`;
  if (event.schedule_organisation?.logo)
    return `${process.env.WSAF_ASSETS_BASE_URL}/${event.schedule_organisation.logo}`;
  if (event.schedule_category?.image)
    return `${process.env.WSAF_ASSETS_BASE_URL}/${event.schedule_category.image}`;

  return MaskImage;
}

export function getOrganisationLogo(
  organisation: schedule_organisation,
): string {
  return `${process.env.WSAF_ASSETS_BASE_URL}/${organisation.logo}`;
}
