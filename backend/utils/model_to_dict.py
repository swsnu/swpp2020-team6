from django.db.models.fields.related import ManyToManyField


def model_to_dict(instance):
    """
    :param instance: django model
    :return: dictionary type
    """
    options = instance._meta
    data = {}
    for f in options.concrete_fields + options.many_to_many:
        if isinstance(f, ManyToManyField):
            if instance.pk is None:
                data[f.name] = []
            else:
                data[f.name] = list(
                    f.value_from_object(instance).values_list("pk", flat=True)
                )
        else:
            data[f.name] = f.value_from_object(instance)
    return data
