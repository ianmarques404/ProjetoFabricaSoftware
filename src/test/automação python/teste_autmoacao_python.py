import os
import sys
import io

if os.name == 'nt':
    os.system('chcp 65001 > nul')

class Unbuffered:
    def __init__(self, stream):
        self.stream = stream
    def write(self, data):
        self.stream.write(data)
        self.stream.flush()
    def writelines(self, datas):
        self.stream.writelines(datas)
        self.stream.flush()
    def flush(self):
        self.stream.flush()
    def __getattr__(self, attr):
        return getattr(self.stream, attr)

sys.stdout = Unbuffered(io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8'))

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
import time

from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from webdriver_manager.microsoft import EdgeChromiumDriverManager

options = Options()
options.add_argument("--start-maximized")
driver = webdriver.Edge(service=Service(EdgeChromiumDriverManager().install()), options=options)

try:
    driver.get("http://localhost:5173")
    time.sleep(1)

    #primeiro teste
    print("Abrindo formulário de nova tarefa...")
    criar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//span[contains(text(), 'Criar nova tarefa')]"))
    )
    criar_btn.click()
    time.sleep(1)

    print("Preenchendo título...")
    titulo_input = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//input[@placeholder='Digite o título...']"))
    )
    titulo_input.clear()
    titulo_input.send_keys("Compras supermercado")
    time.sleep(1)

    print("Aguardando modal abrir...")
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[@data-state='open' and contains(@class, 'fixed')]"))
    )

    print("Esperando opções do select...")
    select_element = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//select"))
    )
    select = Select(select_element)
    select.select_by_value("Concluido")  # Substitua pelo value correto se necessário
    print("Opção 'Concluido' selecionada")
    time.sleep(1)

    print("Clicando em 'digitar manualmente'...")
    digitar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'digitar manualmente')]"))
    )
    digitar_btn.click()
    time.sleep(1)

    print("Preenchendo descrição...")
    campo_textarea = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//textarea[contains(@class, 'text-sm') and contains(@class, 'outline-none')]"))
    )
    campo_textarea.clear()
    campo_textarea.send_keys("Arroz, feijão, Leite, Ovos, veduras, legumes e frutas.")
    time.sleep(1)

    print("Salvando tarefa...")
    salvar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Salvar tarefa')]"))
    )
    salvar_btn.click()

    print("Aguardando mensagem de sucesso...")
    mensagem = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'sucesso') or contains(text(), 'criada')]"))
    )
    print("Mensagem exibida:", mensagem.text)
    time.sleep(1)

    print("Fechando modal...")
    fechar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//div[@role='dialog' and @data-state='open']//button[contains(@class, 'top-0') and contains(@class, 'right-0')]"))
    )
    fechar_btn.click()
    print("Modal fechado com sucesso!")
    time.sleep(2)

    #procurando pelo título
    print("Procurando tarefa com o título 'Compras supermercado'...")
    tarefa_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//p[contains(text(), 'Compras supermercado')]/ancestor::button"))
    )
    print("Tarefa encontrada! Clicando...")
    tarefa_btn.click()
    time.sleep(1)

    print("Aguardando modal abrir...")
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[@role='dialog' and @data-state='open']"))
    )
    time.sleep(1)

    #teste no editar
    print("Clicando no botão Editar...")
    editar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Editar')]"))
    )
    editar_btn.click()
    time.sleep(2)

    print("Selecionando 'Concluido' no select...")
    select_element = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//div[@role='dialog']//select"))
    )
    select = Select(select_element)
    select.select_by_value("Concluido")  # Usar o value real do option, que costuma ser em minúsculas
    time.sleep(1)

    print("Clicando em Salvar...")
    salvar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//div[@role='dialog']//button[contains(text(), 'Salvar')]"))
    )
    salvar_btn.click()
    print("Alteração salva com sucesso.")
    time.sleep(3)

    print("Fechando o modal...")
    fechar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//div[@role='dialog']//button[contains(@class, 'absolute') and contains(@class, 'right-0')]"))
    )
    fechar_btn.click()
    print("Modal fechado com sucesso.")
    time.sleep(3)

    #segundo teste
    print("Abrindo formulário de nova tarefa...")
    criar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//span[contains(text(), 'Criar nova tarefa')]"))
    )
    criar_btn.click()
    time.sleep(1)

    print("Preenchendo título...")
    titulo_input = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//input[@placeholder='Digite o título...']"))
    )
    titulo_input.clear()
    titulo_input.send_keys("Segundo teste")
    time.sleep(1)

    print("Aguardando modal abrir...")
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[@data-state='open' and contains(@class, 'fixed')]"))
    )

    print("Esperando opções do select...")
    select_element = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//select"))
    )
    select = Select(select_element)
    select.select_by_value("Concluido")
    print("Opção 'Concluido' selecionada")
    time.sleep(1)

    print("Clicando em 'digitar manualmente'...")
    digitar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'digitar manualmente')]"))
    )
    digitar_btn.click()
    time.sleep(1)

    print("Preenchendo descrição...")
    campo_textarea = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//textarea[contains(@class, 'text-sm') and contains(@class, 'outline-none')]"))
    )
    campo_textarea.clear()
    campo_textarea.send_keys("Fazendo o segundo teste...")
    time.sleep(1)

    print("Salvando tarefa...")
    salvar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Salvar tarefa')]"))
    )
    salvar_btn.click()

    print("Aguardando mensagem de sucesso...")
    mensagem = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'sucesso') or contains(text(), 'criada')]"))
    )
    print("Mensagem exibida:", mensagem.text)
    time.sleep(1)

    print("Fechando modal...")
    fechar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//div[@role='dialog' and @data-state='open']//button[contains(@class, 'top-0') and contains(@class, 'right-0')]"))
    )
    fechar_btn.click()
    print("Modal fechado com sucesso!")
    time.sleep(2)

    print("Selecionando filtro 'Pendente'...")
    filtro_select = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//select[contains(@class, 'border') and contains(@class, 'rounded-md')]"))
    )
    filtro = Select(filtro_select)
    filtro.select_by_value("Pendente")  # Corrigido aqui
    print("Filtro 'Pendente' aplicado.")
    time.sleep(3)

    print("Selecionando filtro 'Em andamento'...")
    for option in filtro.options:
        if "Em andamento" in option.text:
            option.click()
            print("Filtro 'Em andamento' aplicado.")
            break
    time.sleep(3)
    
    print("Selecionando filtro 'Todas'...")
    for option in filtro.options:
        if "Todas" in option.text:
            option.click()
            print("Filtro 'Todas' aplicado.")
            break
    time.sleep(3)
    
    #apagando segundo teste
    print("Procurando tarefa com o título 'Segundo teste'...")
    tarefa_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//p[contains(text(), 'Segundo teste')]/ancestor::button"))
    )
    tarefa_btn.click()
    time.sleep(1)

    print("Aguardando modal abrir...")
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[@role='dialog' and @data-state='open']"))
    )
    time.sleep(1)

    print("Clicando no span 'apagar essa tarefa'...")
    apagar_span = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//span[contains(text(), 'apagar essa tarefa')]"))
    )
    apagar_span.click()
    print("Clique realizado no span para apagar a tarefa.")
    time.sleep(2)
    print("Tarefa 'Segundo teste' apagada com sucesso!")
    
except Exception as e:
    print("Erro durante o teste:", e)

finally:
    driver.quit()
