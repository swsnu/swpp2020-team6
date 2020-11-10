from django.db.models.fields.related import ManyToManyField
from itertools import chain


def to_dict(instance):
    """
    :param instance: django model
    :return: dictionary type
    """
    options = instance._meta
    data = {}
    print(options.concrete_fields + options.many_to_many)
    for f in chain(options.concrete_fields + options.many_to_many):
        if isinstance(f, ManyToManyField):
            print(instance.pk, f.name, f.value_from_object(instance))
            if instance.pk is None:
                data[f.name] = []
            else:
                data[f.name] = list(item for item in f.value_from_object(instance))
        else:
            data[f.name] = f.value_from_object(instance)

    print(data)
    return data
