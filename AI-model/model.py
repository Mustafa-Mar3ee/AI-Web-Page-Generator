from transformers import GPT2LMHeadModel, GPT2Tokenizer

import torch


def generate_text_with_gpt(payload):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model_path = "./gpt2-medium/"

    tokenizer = GPT2Tokenizer.from_pretrained(model_path)
    model = GPT2LMHeadModel.from_pretrained(model_path, pad_token_id=tokenizer.eos_token_id)
    model.to(device)

    sections = {"section1": payload}

    generated_articles = {}
    for section_name, section_prompt in sections.items():
        input_ids = tokenizer.encode(section_prompt, return_tensors='pt').to(device)

        output = model.generate(
            input_ids.to(device),
            max_length=50,
            num_return_sequences=5,
            num_beams=5,
            no_repeat_ngram_size=2,
            early_stopping=True
        )

        articles = []
        generated_topics = set()
        for article_output in output:
            article = tokenizer.decode(article_output, skip_special_tokens=True)
            if article in generated_topics:
                continue
            generated_topics.add(article)

            # Generate description
            desc_input = tokenizer.encode(article, return_tensors='pt').to(device)
            desc_output = model.generate(
                desc_input.to(device),
                max_length=51, 
                num_return_sequences=1,
                num_beams=5,
                no_repeat_ngram_size=2,
                early_stopping=True
            )
            description = tokenizer.decode(desc_output[0], skip_special_tokens=True)

            # Generate paragraph
            para_input = tokenizer.encode(article + description, return_tensors='pt').to(device)
            para_output = model.generate(
                      para_input.to(device),
                      max_length=150,
                      num_return_sequences=1,
                      num_beams=5,
                      no_repeat_ngram_size=2,
                      early_stopping=True
                    )

            paragraph = tokenizer.decode(para_output[0], skip_special_tokens=True)

            articles.append({
                'title': article,
                'description': description,
                'paragraph': paragraph,
                'sectionId': 1,
                'image': ""
            })
        generated_articles[section_name] = articles
    output_json = articles
    return output_json
