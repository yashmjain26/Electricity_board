import re


def trim_extra_whitespaces_from_string(value):
    """
    :param string: ' some    text  '
    :return string: 'some text'
    """
    return re.sub("\s+", " ", value)
