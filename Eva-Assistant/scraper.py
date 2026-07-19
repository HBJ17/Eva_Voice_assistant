import wikipedia

def get_answer(query):
    """
    A very simple web scraper using the Wikipedia library.
    It takes a query, searches Wikipedia, and returns a short summary.
    """
    try:
        # We try to get the summary of the first matched page
        # sentences=2 ensures we don't get a massive wall of text
        result = wikipedia.summary(query, sentences=2)
        return result
    except wikipedia.exceptions.DisambiguationError as e:
        # If the search term is too broad, it gives options. We'll pick the first one.
        try:
            result = wikipedia.summary(e.options[0], sentences=2)
            return result
        except:
            return "I'm sorry, I found too many results. Could you be more specific?"
    except wikipedia.exceptions.PageError:
        return "I'm sorry, I couldn't find any information on that topic."
    except Exception as e:
        return "I'm having trouble connecting to the web right now."
