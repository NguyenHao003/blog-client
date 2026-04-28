'use client';

import { SORT_ORDER } from '@/common/enums';
import { setOrder } from '@/common/helpers';
import useModalStore from '@/common/hooks/use-modal';
import TagFilter from '@/modules/tag/components/tag-filter';
import TagModalForm from '@/modules/tag/components/tag-modal-form';
import { TagsTable } from '@/modules/tag/components/tags-table';
import { TagModalType } from '@/modules/tag/enums';
import { useTags } from '@/modules/tag/hooks/use-tags';
import { TagFilter as TagFilterType } from '@/modules/tag/types/tag-types';
import { PageContainer } from '@ant-design/pro-components';
import { Pagination } from 'antd';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export default function TagsPage() {
    const [params, setParams] = useQueryStates({
        page: parseAsInteger.withDefault(1),
        pageSize: parseAsInteger.withDefault(20),
        sortField: parseAsString,
        sortOrder: parseAsString,
        keyword: parseAsString,
    });

    const { tags, isFetching } = useTags(params as TagFilterType);
    const typeModal = useModalStore((s) => s.typeModal);
    const closeModal = useModalStore((s) => s.closeModal);
    const openModal = useModalStore((s) => s.openModal);

    const isModalOpen =
        typeModal === TagModalType.TAG_CREATE ||
        typeModal === TagModalType.TAG_UPDATE;

    const onSort = (_pagination: any, _filters: any, sorter: any) => {
        const orderField = sorter.field;
        const order = setOrder(sorter, SORT_ORDER.ASC);

        setParams({
            sortField: orderField,
            sortOrder: order,
        });
    };

    return (
        <PageContainer
            header={{
                title: 'Tag Management',
                subTitle: 'Manage tags for your posts',
            }}
        >
            <TagFilter
                params={{
                    keyword: params.keyword,
                }}
                onFilter={(values: any) =>
                    setParams({
                        keyword: values.keyword || null,
                        page: 1,
                    })
                }
            />

            <TagsTable
                dataSource={tags?.items || []}
                loading={isFetching}
                pagination={{
                    pageSize: params.pageSize,
                    current: params.page,
                }}
                sortField={params.sortField}
                sortOrder={params.sortOrder}
                onCreate={() => openModal(TagModalType.TAG_CREATE)}
                onChange={onSort}
            />

            <Pagination
                style={{ background: 'white', padding: '0 12px 12px' }}
                align="end"
                showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                }
                total={tags?.metadata?.totalItems}
                current={params.page}
                pageSize={params.pageSize}
                onChange={(page, pageSize) => {
                    setParams({ page, pageSize });
                }}
            />

            <TagModalForm open={isModalOpen} onCancel={closeModal} />
        </PageContainer>
    );
}
