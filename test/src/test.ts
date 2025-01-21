import nunjucks, { render } from 'nunjucks';
import util from 'util';
import path from 'path';
import * as fs from 'fs';

// Test default values with minimum set of templated files (catalog-info.yaml and index.md)
test('001-model-required-values-only', () => {
    let modelTemplateValues = {
        "values": {
            "modelName": "ibm-granite-8b",
            "modelDescription": "The IBM Granite 8b code instruct model, deployed on vLLM",
            "modelURL": "https://model-server.example.com",
            "modelServerName": "vllm",
            "modelServerAPIURL": "https://api.model-server.example.com",
            "modelResourceURL": "https://huggingface.co/ibm-granite/granite-3.1-8b-instruct",
            "modelLicenseURL": "https://huggingface.co/datasets/choosealicense/licenses/blob/main/markdown/apache-2.0.md",
            "modelLicense": "Apache-2",
            "modelTags": ["granite", "ibm", "huggingface", "llm"],
            "modelOwner": "rhdh-user",
            "modelSupport": "https://github.com/ibm-granite/granite-3.1-language-models",
            "modelDeveloper": "IBM Research"
        }
    };

    testModelCatalogDefaults(path.join("test_data", "model", "001-required-values-only"), modelTemplateValues);
});

// Test default values for all model templates, including templates
test('002-model-all-techdocs', () => {
    let modelTemplateValues = {
        "values": {
            "modelName": "meta-llama-32-1b",
            "modelDescription": "The Llama 3.2 collection of multilingual large language models (LLMs) is a collection of pretrained and instruction-tuned generative models in 1B and 3B sizes (text in/text out). The Llama 3.2 instruction-tuned text only models are optimized for multilingual dialogue use cases, including agentic retrieval and summarization tasks. They outperform many of the available open source and closed chat models on common industry benchmarks.",
            "modelURL": "https://model-service.apps.example.com",
            "modelServerName": "ollama-model-service",
            "modelServerAPIURL": "https://api.model-service.apps.example.com",
            "modelResourceURL": "https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct",
            "modelLicenseURL": "https://github.com/meta-llama/llama-models/blob/main/models/llama3_2/LICENSE",
            "modelLicense": "Llama 3.2 Community",
            "modelTags": ["genai", "meta", "llm", "llama", "conversational", "multilingual", "task-text-generation", "1b"],
            "modelOwner": "exampleuser",
            "modelSupport": "https://github.com/ibm-granite/granite-3.1-language-models",
            "modelDeveloper": "Meta",
            "modelEthics": "Values: The core values of Llama 3.2 are openness, inclusivity and helpfulness. It is meant to serve everyone, and to work for a wide range of use cases. It is thus designed to be accessible to people across many different backgrounds, experiences and perspectives. Llama 3.2 addresses users and their needs as they are, without insertion unnecessary judgment or normativity, while reflecting the understanding that even content that may appear problematic in some cases can serve valuable purposes in others. It respects the dignity and autonomy of all users, especially in terms of the values of free thought and expression that power innovation and progress.\n\nTesting: Llama 3.2 is a new technology, and like any new technology, there are risks associated with its use. Testing conducted to date has not covered, nor could it cover, all scenarios. For these reasons, as with all LLMs, Llama 3.2’s potential outputs cannot be predicted in advance, and the model may in some instances produce inaccurate, biased or other objectionable responses to user prompts. Therefore, before deploying any applications of Llama 3.2 models, developers should perform safety testing and tuning tailored to their specific applications of the model. Please refer to available resources including our Responsible Use Guide, Trust and Safety solutions, and other resources to learn more about responsible development.",
            "modelTraining": "Llama 3.2 was pretrained on up to 9 trillion tokens of data from publicly available sources. For the 1B and 3B Llama 3.2 models, we incorporated logits from the Llama 3.1 8B and 70B models into the pretraining stage of the model development, where outputs (logits) from these larger models were used as token-level targets. Knowledge distillation was used after pruning to recover performance. In post-training we used a similar recipe as Llama 3.1 and produced final chat models by doing several rounds of alignment on top of the pre-trained model. Each round involved Supervised Fine-Tuning (SFT), Rejection Sampling (RS), and Direct Preference Optimization (DPO).",
            "modelUsage": "Llama 3.2 is intended for commercial and research use in multiple languages. Instruction tuned text only models are intended for assistant-like chat and agentic applications like knowledge retrieval and summarization, mobile AI powered writing assistants and query and prompt rewriting. Pretrained models can be adapted for a variety of additional natural language generation tasks."
        }
    };

    testModelCatalogDefaults(path.join("test_data", "model", "002-model-all-techdocs"), modelTemplateValues);
    testModelCatalogTechdocs(path.join("test_data", "model", "002-model-all-techdocs"), modelTemplateValues);
});

// renderTemplates takes in a given templated file, and a list of json-formatted values, and returns the rendered template
// ToDo: Render entire template directory structure? Would need to figure how to handle comparisons between rendered template dirs and test data
function renderTemplates(filePath: string, values: object): string {
    let parentDir:string = path.dirname(filePath);
    let fileName:string = path.basename(filePath);

    nunjucks.configure(parentDir, { autoescape: true });
    return nunjucks.render(fileName, values);
}

// testModelCatalogEntity renders each of the template files in the model entity template, and validates they match
// 
function testModelCatalogDefaults(testFolderPath: string, values: object) {
    let catalogInfoName = "catalog-info.yaml";
    let catalogInfopath = path.join(testFolderPath, catalogInfoName);
    let modelTemplatePath = path.join("../", "template", "model");
    let catalogInfoTemplatePath = path.join(modelTemplatePath, catalogInfoName);

    // Validate the rendered catalog-info.yaml matches
    testFileMatchesTemplate(catalogInfopath, catalogInfoTemplatePath, values);

    // Validate the rendered index.md techdoc
    let indexTechdocPath = path.join(testFolderPath, "docs", "index.md");
    let indexTemplatePath = path.join(modelTemplatePath, "docs", "index.md");
    testFileMatchesTemplate(indexTechdocPath, indexTemplatePath, values);
}

// testModelCatalogEntity renders each of the template files in the model entity template, and validates they 
function testModelCatalogTechdocs(testFolderPath: string, values: object) {
    let catalogInfoName = "catalog-info.yaml";
    let modelTemplatePath = path.join("../", "template", "model");

    // Validate the rendered index.md techdoc
    let indexTechdocPath = path.join(testFolderPath, "docs", "index.md");
    let indexTemplatePath = path.join(modelTemplatePath, "docs", "index.md");
    testFileMatchesTemplate(indexTechdocPath, indexTemplatePath, values);

    // Validate the rendered ethics.md techdoc
    let ethicsTechdocPath = path.join(testFolderPath, "docs", "ethics.md");
    let ethicsTemplatePath = path.join(modelTemplatePath, "docs", "ethics.md");
    testFileMatchesTemplate(ethicsTechdocPath, ethicsTemplatePath, values);

    // Validate the rendered training.md techdoc
    let trainingTechdocPath = path.join(testFolderPath, "docs", "training.md");
    let trainingTemplatePath = path.join(modelTemplatePath, "docs", "training.md");
    testFileMatchesTemplate(trainingTechdocPath, trainingTemplatePath, values);

    // Validate the rendered usage.md techdoc
    let usageTechdocPath = path.join(testFolderPath, "docs", "usage.md");
    let usageTemplatePath = path.join(modelTemplatePath, "docs", "usage.md");
    testFileMatchesTemplate(usageTechdocPath, usageTemplatePath, values);
}

function testFileMatchesTemplate(testFilePath: string, templateFilePath: string, values: object) {
    let testFile = fs.readFileSync(testFilePath, 'utf8');
    let renderedTemplateFile = renderTemplates(templateFilePath, values)
    expect(renderedTemplateFile).toEqual(testFile);
}