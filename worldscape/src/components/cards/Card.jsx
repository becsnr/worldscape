import styles from "./Card.module.css";
import { CSS } from "@dnd-kit/utilities";

import { useEffect, useState } from "react";
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";

import AddButton from "../buttons/AddButton";
import CardMenu from "../buttons/CardMenu";

function SortableCover({ item, children, organizing }) {
    const { 
        attributes, listeners, setNodeRef, transform, transition 
    } = useSortable({ 
        id: item.id, disabled: !organizing 
    });

    const style = {
        transform: CSS.Transform.toString(transform), transition
    };

    const handleProps = {
        ...attributes,
        ...listeners
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children(handleProps)}
        </div>
    )
}

function Card({ title, items, tipo, onDelete, onUpdateOrder, expanded = false }) {
    const [selectingItem, setSelectingItem] = useState(false); // para excluir
    const [selectingItemId, setSelectingItemId] = useState(null);
    const [organizing, setOrganizing] = useState(false); // para organizar a ordem
    const [orderedItems, setOrderedItems] = useState(items); // para guardar a ordem q esta sendo editada
    const [originalItems, setOriginalItems] = useState(items); // guardar a ordem anterior p/ poder cancelar

    const sensors = useSensors(
        useSensor(PointerSensor, { // detecta o movimento com mouse
            activationConstraint: {
                distance: 5
            }
        }),
        useSensor(TouchSensor, { // detecta o movimento com o dedo na tela
            activationConstraint: {
                delay: 200,
                tolerance: 5
            }
        })
    );

    useEffect(() => { // sincroniza a lista temporaria
        setOrderedItems(items);
    }, [items]);

    // descobrir nova ordem dos items
    function handleDragEnd(event) {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = orderedItems.findIndex(
            (item) => item.id === active.id
        );

        const newIndex = orderedItems.findIndex(
            (item) => item.id === over.id
        );

        const newItems = arrayMove(orderedItems, oldIndex, newIndex);

        setOrderedItems(newItems); // atualiza a lista exibida na tela
    }

    function handleCancelOrganizing() {
        setOrderedItems(originalItems); // recupera a ordem que estava salva antes da edição
        setOrganizing(false); // encerra o modo de edição
    }

    function handleStartOrganizing() {
        setSelectingItem(false);
        setSelectingItemId(null);

        setOriginalItems(orderedItems);
        setOrganizing(true);
    }

    async function handleSaveOrganizing() {
        await onUpdateOrder(orderedItems.map(item => item.id));

        setOriginalItems(orderedItems);
        setOrganizing(false);
    }

    return (
        <div className={`${styles.card} ${expanded ? styles.expanded : ""} ${selectingItem ? styles.selecting : ""} ${orderedItems ? styles.selecting : ""}`} >
            <div className={styles.header}>
                <h3>{title}</h3>

                <div className={styles.cardButtons}>
                    <AddButton />
                    <CardMenu 
                        tipo={tipo} 
                        title={title} 
                        items={items} 
                        onStartSelecting={() => {
                            setOrganizing(false);
                            setSelectingItemId(null);
                            setSelectingItem(true);
                        }}
                        onStartOrganizing={handleStartOrganizing}
                    />
                </div>
            </div> 

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={orderedItems.map(item => item.id)}
                    strategy={horizontalListSortingStrategy}
                >
                    <div className={styles.coverContainer}>
                        {orderedItems?.map((item) => (
                            item.image ? (
                                <SortableCover 
                                    key={item.id}
                                    item={item}
                                    organizing={organizing}
                                >
                                    {(handleProps) => (
                                        <div className={styles.covers} key={item.id ?? item.title}>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                onClick={() => {
                                                    if (selectingItem) {
                                                        setSelectingItemId(item.id);
                                                    }
                                                }}
                                                style={{
                                                    outline: selectingItemId === item.id ? "3px solid #8a67d8" : "none"
                                                }}
                                            />

                                            {organizing && (
                                                <div 
                                                    className={styles.dragHandle}
                                                    {...handleProps}
                                                >
                                                    ☰
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </SortableCover>
                            ) : (
                                <p 
                                    key={item.id ?? item.titulo}
                                    onClick={() => {
                                        if (selectingItem) {
                                            setSelectingItemId(item.id);
                                        }
                                    }}
                                    style={{
                                        outline: selectingItemId === item.id ? "3px solid #8a67d8" : "none"
                                    }}
                                >
                                    {item.titulo || item.title}
                                </p>
                            )
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {selectingItem && (
                <div className={styles.selectionActions}>
                    <button 
                        className={styles.cancelButton}
                        onClick={() => {
                        setSelectingItem(false);
                        setSelectingItemId(null);
                    }}>
                        Cancelar
                    </button>

                    <button 
                        className={styles.removeButton}
                        disabled={!selectingItemId}
                        onClick={async () => {
                            await onDelete(selectingItemId);
                            setSelectingItem(false);
                            setSelectingItemId(null);
                        }}
                    >
                        Remover item
                    </button>
                </div>
            )}

            {organizing && (
                <div className={styles.selectionActions}>
                    <button 
                        className={styles.cancelButton}
                        onClick={handleCancelOrganizing}
                    >
                        Cancelar
                    </button>

                    <button 
                        className={styles.saveButton}
                        onClick={handleSaveOrganizing}
                    >
                        Salvar
                    </button>
                </div>
            )}
        </div>
    )
}

export default Card;