'use client';

import { SORT_ORDER } from '@/common/enums';
import { setOrder } from '@/common/helpers';
import useModalStore from '@/common/hooks/use-modal';
import { PageContainer } from '@ant-design/pro-components';
import { Pagination } from 'antd';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useCategories } from '@/modules/category/hooks/use-categories';
import { useTags } from '@/modules/tag/hooks/use-tags';
import PostEditorModal from '@/modules/post/components/post-editor-modal';
import PostFilter from '@/modules/post/components/post-filter';
import { PostsTable } from '@/modules/post/components/posts-table';
import { PostModalType } from '@/modules/post/enums';
import { usePosts } from '@/modules/post/hooks/use-posts';

export default function PostsPage() {
    const [params, setParams] = useQueryStates({
        page: parseAsInteger.withDefault(1),
        pageSize: parseAsInteger.withDefault(20),
        sortField: parseAsString,
        sortOrder: parseAsString,
        keyword: parseAsString,
        status: parseAsString,
    });

    const { posts, isFetching } = usePosts({
        page: params.page,
        pageSize: params.pageSize,
        sortField: params.sortField,
        sortOrder: params.sortOrder,
        keyword: params.keyword,
        status: (params.status as any) || null,
    });
    const { categories } = useCategories({ page: 1, pageSize: 100 });
    const { tags } = useTags({ page: 1, pageSize: 100 });

    const typeModal = useModalStore((s) => s.typeModal);
    const closeModal = useModalStore((s) => s.closeModal);
    const openModal = useModalStore((s) => s.openModal);

    const isModalOpen =
        typeModal === PostModalType.POST_CREATE ||
        typeModal === PostModalType.POST_UPDATE;

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
                title: 'Posts Management',
                subTitle: 'Manage your blog posts',
            }}
        >
            <PostFilter
                params={{
                    keyword: params.keyword,
                    status: (params.status as any) || null,
                }}
                onFilter={(values: any) =>
                    setParams({
                        keyword: values.keyword || null,
                        status: values.status || null,
                        page: 1,
                    })
                }
            />

            <PostsTable
                dataSource={posts?.items || []}
                loading={isFetching}
                pagination={{
                    current: params.page,
                    pageSize: params.pageSize,
                }}
                sortField={params.sortField}
                sortOrder={params.sortOrder}
                onCreate={() => openModal(PostModalType.POST_CREATE)}
                onChange={onSort}
            />

            <Pagination
                style={{ background: 'white', padding: '0 12px 12px' }}
                align="end"
                showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                }
                total={posts?.metadata?.totalItems}
                current={params.page}
                pageSize={params.pageSize}
                onChange={(page, pageSize) => {
                    setParams({ page, pageSize });
                }}
            />

            <PostEditorModal
                open={isModalOpen}
                onCancel={closeModal}
                categories={
                    categories?.items?.map((item) => ({
                        label: item.name,
                        value: String(item.id),
                    })) || []
                }
                tags={
                    tags?.items?.map((item) => ({
                        label: item.name,
                        value: String(item.id),
                    })) || []
                }
            />
        </PageContainer>
    );
}
