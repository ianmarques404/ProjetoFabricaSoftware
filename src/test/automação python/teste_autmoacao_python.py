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
    titulo_input.send_keys("compras supermercado")
    time.sleep(1)

    print("Aguardando modal abrir...")
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//div[@data-state='open' and contains(@class, 'fixed')]"))
    )

    print("Esperando opções do select...")
    select_element = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//select"))
    )
    time.sleep(1)
    select = Select(select_element)
    select.select_by_value("Pendente")
    print("Opção 'Pendente' selecionada")
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
    campo_textarea.send_keys("teste 01")
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

    # Fechar modal
    fechar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//div[@role='dialog' and @data-state='open']//button[contains(@class, 'top-0') and contains(@class, 'right-0')]"))
    )
    fechar_btn.click()
    print("Modal fechado com sucesso!")
    time.sleep(2)

    # Clicar na tarefa criada
    print("Procurando tarefa com o título 'compras supermercado'...")
    tarefa_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//p[contains(text(), 'compras supermercado')]/ancestor::button"))
    )
    print("Tarefa encontrada! Clicando...")
    tarefa_btn.click()
    time.sleep(1)

    # Esperar modal abrir
    print("Aguardando modal abrir...")
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//div[@role='dialog' and @data-state='open']"))
    )
    time.sleep(1)

    # Clicar em "Editar"
    print("Clicando no botão Editar...")
    editar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Editar')]"))
    )
    editar_btn.click()
    time.sleep(2)

    # Selecionar a opção "Concluido" no select
    print("Selecionando 'Concluido'...")
    select_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//div[@role='dialog']//select"))
    )
    select = Select(select_element)

    driver.execute_script("""
    const select = arguments[0];
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === 'Pendente') {
            select.remove(i);
            break;
        }
    }
    """, select_element)

    select.select_by_visible_text("Concluido")
    time.sleep(1)

    # Clicar no botão "Salvar"
    print("Clicando em Salvar...")
    salvar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//div[@role='dialog']//button[contains(text(), 'Salvar')]"))
    )
    salvar_btn.click()
    print("Alteração salva com sucesso.")
    time.sleep(3)

    # Clicar no botão de fechar (X)
    print("Fechando o modal...")
    fechar_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//div[@role='dialog']//button[contains(@class, 'absolute') and contains(@class, 'right-0')]"))
    )
    fechar_btn.click()
    print("Modal fechado com sucesso.")
    time.sleep(3)

    # Selecionar "Concluídas" no filtro de tarefas
    print("Selecionando filtro 'Concluídas'...")
    filtro_select = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//select[contains(@class, 'border') and contains(@class, 'rounded-md')]"))
    )

    filtro = Select(filtro_select)
    filtro.select_by_visible_text("Concluídas")
    print("Filtro 'Concluídas' aplicado.")
    time.sleep(3)

    # Selecionar "Pendentes"
    print("Selecionando filtro 'Pendentes'...")
    filtro.select_by_visible_text("Pendentes")
    time.sleep(3)

    # Selecionar "Em andamento"
    print("Selecionando filtro 'Em andamento'...")
    filtro.select_by_visible_text("Em andamento")
    time.sleep(3)

except Exception as e:
    print("Erro durante o teste:", e)

finally:
    driver.quit()
